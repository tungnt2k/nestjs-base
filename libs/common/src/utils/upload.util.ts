export const imageFileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const extension = file.originalname.split('.').pop().toLowerCase();

  const isAllowed = allowedExtensions.includes(extension);

  cb(isAllowed ? null : new Error('Only image files are allowed!'), isAllowed);
};

export const editFileName = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = file.originalname;
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  cb(null, `${name}-${randomName}${fileExtName}`);
};
