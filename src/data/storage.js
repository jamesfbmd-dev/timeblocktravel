export const db = {
  // Generate unique IDs for items and trips
  uid: () => '_' + Math.random().toString(36).substr(2, 9),

  save: (data) => localStorage.setItem('travel_app_data', JSON.stringify(data)),

  load: () => {
    const data = localStorage.getItem('travel_app_data');
    return data ? JSON.parse(data) : { activeItineraryId: null, itineraries: {} };
  },

  getDay: (day) => {
    if (!day) return null;

    const data = localStorage.getItem('travel_app_data');
    if (!data) return null;

    const jsonData = JSON.parse(data);
    const itinerary = jsonData.itineraries[jsonData.activeItineraryId];

    if (!itinerary || !itinerary.events) return null;

    return itinerary.events[day] || null;
  }
};