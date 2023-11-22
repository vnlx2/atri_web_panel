export default (errorCode: string, errors?:[]) => {
  switch(errorCode) {
    case 'VALIDATION_ERROR':
      return {
        message: 'Validation error',
        
      }
  }
}