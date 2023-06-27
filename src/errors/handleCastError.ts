import { CastError } from 'mongoose';
import { IGenericErrorMessage } from '../interface/error';

const handleCastError = (err: CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Errro',
    errorMessage: errors,
  };
};

export default handleCastError;
