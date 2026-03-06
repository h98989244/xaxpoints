-- 修復 profiles RLS 遞迴問題
-- Admin 查詢政策引用 profiles 自身會導致 500 錯誤

-- 移除有問題的政策
DROP POLICY IF EXISTS "使用者可查看自己的資料" ON profiles;
DROP POLICY IF EXISTS "使用者可更新自己的資料" ON profiles;
DROP POLICY IF EXISTS "Admin 可查看所有資料" ON profiles;

-- 重新建立：使用者可讀取與更新自己的資料
CREATE POLICY "使用者可查看自己的資料" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "使用者可更新自己的資料" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admin 政策改用 auth.jwt() 避免遞迴查詢
CREATE POLICY "Admin 可查看所有資料" ON profiles
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'service_role'
    OR auth.uid() = id
  );

-- 新增：允許 INSERT（handle_new_user 觸發器需要）
CREATE POLICY "系統可建立使用者資料" ON profiles
  FOR INSERT WITH CHECK (true);
