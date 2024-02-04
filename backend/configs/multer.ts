import {DiskStorageOptions} from 'multer'
import path from 'path';

const multerOptions: DiskStorageOptions = {
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalFileName = path.parse(file.originalname).name;
        const newFileName = `${originalFileName}_${uniqueSuffix}${path.extname(file.originalname)}`;
        cb(null, newFileName);
    }
}

export default multerOptions