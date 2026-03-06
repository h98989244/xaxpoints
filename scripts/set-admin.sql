-- 將指定 email 的使用者設為管理員
-- 使用方式：先在網站註冊帳號，然後在 Supabase SQL Editor 執行此腳本
-- 請將下方 email 替換為你的管理員帳號

UPDATE profiles
SET role = 'admin'
WHERE email = '替換成你的Email';
