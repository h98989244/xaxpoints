-- ============================================
-- 推薦系統：referral_code + referrals 表
-- ============================================

-- 1. profiles 加入 referral_code 欄位
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- 為現有使用者產生 referral_code（取 UUID 前 8 碼）
UPDATE profiles SET referral_code = LEFT(REPLACE(id::text, '-', ''), 8)
WHERE referral_code IS NULL;

-- 新使用者自動產生 referral_code
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, referral_code)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    LEFT(REPLACE(NEW.id::text, '-', ''), 8)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. 推薦紀錄表
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'completed')),
  reward_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(referred_id)
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- 推薦人可查看自己的推薦紀錄
CREATE POLICY "推薦人可查看自己的紀錄" ON referrals
  FOR SELECT USING (auth.uid() = referrer_id);

-- 系統插入（透過 service role 或 trigger）
CREATE POLICY "允許插入推薦紀錄" ON referrals
  FOR INSERT WITH CHECK (true);

-- Admin 可查看全部
CREATE POLICY "Admin 可查看所有推薦" ON referrals
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 公開查詢 referral_code（用於註冊驗證）
CREATE POLICY "公開查詢 referral_code" ON profiles
  FOR SELECT USING (true);
