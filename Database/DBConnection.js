import mongoose from 'mongoose';

export function dbconnection() {
  mongoose
    .connect(process.env.DBURL)
    .then(() => {
      console.log('DB connected');
    })
    .catch(err => {
      console.log(err);
    });
}
