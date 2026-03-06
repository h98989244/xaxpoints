-- 建立 product-images storage bucket（公開讀取）
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 任何人可讀取（公開圖片）
DO $$ BEGIN
  CREATE POLICY "公開讀取商品圖片" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Admin 可上傳
DO $$ BEGIN
  CREATE POLICY "Admin 可上傳商品圖片" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'product-images'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Admin 可刪除
DO $$ BEGIN
  CREATE POLICY "Admin 可刪除商品圖片" ON storage.objects FOR DELETE USING (
    bucket_id = 'product-images'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
