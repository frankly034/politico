import multer from 'multer';

const storage = multer.memoryStorage();

const multerUploadMiddleware = filename => multer({ storage }).single(filename);

export default multerUploadMiddleware;
