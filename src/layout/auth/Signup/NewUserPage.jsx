import { useEffect, useState } from 'react';
import './newUserPage.css';
import Input from './Input';
import { signUp } from '../../../api/auth';
import Form from './Form';

function NewUserPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <section
      id="neu-user"
      className="masthead"
    >
      <div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="mx-auto my-0 text-uppercase">New Space Traveler</h1>
          {loading ? <Form /> : <p> Loading ...</p>}
        </div>
      </div>
    </section>
  );
}

export default NewUserPage;
