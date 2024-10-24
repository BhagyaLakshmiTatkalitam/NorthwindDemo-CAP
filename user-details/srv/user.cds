service CatalogService @(requries:'authenticated-user') {

  function getUserDetails() returns UserDetails;

}
type UserDetails {
  id: String;
  email: String;
  roles: many String;
}
