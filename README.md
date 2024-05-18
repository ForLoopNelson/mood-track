A CRUD app for tracking your mood, login with a Gmail account. Create Public and Private Journal Entries. Letting go of negative thoughts. Type in your negative thought and watch it disappear.

** Start app production: npm start
** Start app Development: npm run dev

TODO:
--Make the Title text a tad bigger when on Mobile. Tablet looks ok

--Get rid of unused JS files

--Add weather widget to dashboard to show the user their local weather.

-- fix animation on letting go text. It goes to fast on mobile devices

-- setup another login way using email

--!!!! FIX Time for created at and updated at are wrong in the app and on the DB suggested fix to try later below:
<!-- 
const yourSchema = new mongoose.Schema({
  // other fields...
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
 -->

