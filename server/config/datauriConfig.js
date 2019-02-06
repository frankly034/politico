import path from 'path';
import Datauri from 'datauri';

const datauri = new Datauri();

const fetchFormattedImage = req => datauri.format(path.extname(req.file.originalname)
  .toString(), req.file.buffer);

export default fetchFormattedImage;
