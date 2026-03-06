-- 電子報訂閱者
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 任何人可訂閱（插入）
CREATE POLICY "任何人可訂閱電子報" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Admin 可查看
CREATE POLICY "Admin 可查看訂閱者" ON newsletter_subscribers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
