function NewUserPage() {
  return (
    <section>
      <h2>New Space Traveler</h2>
      <form>
      <p>
          <label>
            Name User
            <br />
            <input
              type="email"
              name="email"
              id="email"
              required
            />
          </label>
        </p>
        <p>
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
        <p>
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
        <p>
          <label>
            Confirm Password
            <br />
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              required
            />
          </label>
        </p>
        <button type="submit">Sign in</button>
      </form>
    </section>
  );
}

export default NewUserPage;
