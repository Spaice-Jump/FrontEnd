import { useEffect, useState } from 'react';

export const Error = ( {error} ) => {
    console.log(error)

  const [isError, setIsError] = useState ('');


  useEffect(() => {
    setIsError(error)
  }, [error]);


  const resetError = () => {
    setIsError('');
  };


  return (
    <div>
      {!error ? (
        <br />
      ) : (
        <div
          className="error"
          onClick={resetError}
        >
          <p data-testid="error"> {isError}</p>
        </div>
      )}
    </div>
  );
};
