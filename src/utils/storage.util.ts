// src/utils/storage.util.ts
import { diskStorage } from 'multer';
import { Request } from 'express';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './assets',
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname); // รักษานามสกุลไฟล์เดิม
    const filename = `${uniqueSuffix}-${file.originalname}`;
    cb(null, filename);
  },
});
