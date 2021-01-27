import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'), //> ../../uploads
    filename: (request, file, save) => {
      const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, "_");

      save(null, fileName);
    }
  })
};