export const fetchUser = async () => {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?results=50&nat=us"
    );
    const { results } = await response.json();

    return results.map(processContact);
  } catch (err) {
    console.log(err);
  }
};

const processContact = (contact) => ({
  name: `${contact.name.first} ${contact.name.last}`,
  phone: contact.phone,
});
