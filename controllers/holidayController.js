import axios from 'axios';

export const getGoogleHolidays = async (req, res) => {
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  if (!year || !month) {
    return res.status(400).json({ 
      message: 'Please provide year and month as query parameters.',
      example: '?year=2024&month=12' 
    });
  }

  const calendarId = 'en.pk.official#holiday@group.v.calendar.google.com';
  
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'API Key is not configured on the server.' });
  }

  const timeMin = new Date(year, month - 1, 1).toISOString();
  const timeMax = new Date(year, month, 1).toISOString();
  
  const encodedCalendarId = encodeURIComponent(calendarId);
  const requestUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodedCalendarId}/events`;

  try {
    const response = await axios.get(requestUrl, {
      params: { key: apiKey, timeMin, timeMax, singleEvents: true, orderBy: 'startTime' }
    });

    const holidays = response.data.items.map(event => ({
      date: event.start.date || event.start.dateTime,
      name: event.summary
    }));

    res.status(200).json({
      country: "Pakistan", 
      year: year,
      month: month,
      totalHolidays: holidays.length,
      holidays: holidays
    });

  } catch (error) {
    const errorDetails = error.response ? error.response.data.error : { message: error.message };
    console.error(`Error for Pakistan:`, JSON.stringify(errorDetails, null, 2));
    res.status(500).json({ 
      message: `Failed to fetch holidays for Pakistan.`,
      error: errorDetails
    });
  }
};