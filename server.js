const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the form
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission and store reminder data
// Route to handle form submission and store reminder data
app.post('/reminders', (req, res) => {
    try {
        const { date, time, message, remind_via } = req.body;
        const reminder = { date, time, message, remind_via };
        console.log(reminder)
        let reminders = [];
        let remindersPath = 'reminders.json';
        
        // Check if reminders.json file exists
        if (fs.existsSync(remindersPath)) {
            // Read from the file and parse JSON data
            const data = fs.readFileSync(remindersPath, 'utf8');
            if (data) {
                reminders = JSON.parse(data);
            }
        } else {
            // If the file doesn't exist, create it
            fs.writeFileSync(remindersPath, '[]');
        }

        // Add new reminder
        reminders.push(reminder);

        // Write reminders back to file
        fs.writeFileSync(remindersPath, JSON.stringify(reminders));

       res.send(" '<h1>wellcome! data stored successfully  </h1>");
    } catch (error) {
        console.error('Error creating reminder:', error);
        res.status(500).send('Internal server error');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
