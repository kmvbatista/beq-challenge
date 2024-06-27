# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached. 

**1. How does the client ensure that their data has not been tampered with?**
Using blockchain technology to store hashes of user data, ensuring data integrity. This way, we can implement a hash-based verification system to detect any tampering.
**2. If the data has been tampered with, how can the client recover the lost data?**
We can solve it through regularly backing up the data to a secure and separate location. And then we can implement a versioning system to keep historical records of the data.

The solution implemented here gets the latest version when recovering the lost data

### To run the apps:
```npm run start``` in both the frontend and backend

## To make a submission:
1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance
