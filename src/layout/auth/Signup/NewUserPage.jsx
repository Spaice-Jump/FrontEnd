import './newUserPage.css';

function NewUserPage() {
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <section
      id="neu-user"
      className="masthead"
    >
      <div className='px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center'>
        <div className='text-center'>

        <h1 className="mx-auto my-0 text-uppercase">New Space Traveler</h1>
        <form onSubmit={handleSubmit}>
          <p className="text-white-50 mx-auto mt-2 mb-5">
            <label>
              Name User
              <br />
              <input
                type="text"
                name="user"
                id="user"
                required
              />
            </label>
          </p>
          <p className="text-white-50 mx-auto mt-2 mb-5">
            <label>
              Email
              <br />
              <input
                type="email"
                name="email"
                id="email"
                required
              />
            </label>
          </p>
          <p className="text-white-50 mx-auto mt-2 mb-5">
            <label>
              Password
              <br />
              <input
                type="password"
                name="password"
                id="password"
                required
              />
            </label>
          </p>
          <p className="text-white-50 mx-auto mt-2 mb-5">
            <label>
            Password Confirm 
              <br />
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                required
              />
            </label>
          </p>
          <button
            type="submit"
            class="btn btn-primary"
          >
            Sign in
          </button>
        </form>
        </div>
      </div>
    </section>
  );
}

export default NewUserPage;
