export interface WeddingEvent {
  date: string;
  title: string;
  time: string;
  venue: string;
  venueShort: string;
  mapHref: string;
}

export const WEDDING_DATA = {
  bride: {
    name: "Dr. Shalini",
    hindiName: "शालिनी",
    parents: "D/O Mr. Dipak Gupta & Mrs. Minu Gupta",
    grandparents: "Late Sh. Dayanand Gupta & Smt. Sobha Devi",
  },
  groom: {
    name: "Dr. Kunal",
    hindiName: "कुणाल",
    parents: "S/O Mr. Mukesh Kumar & Mrs. Pranita Kumari",
    grandparents: "Late Sh. Surendra Mohan Saha & Late Smt. Anima Devi",
  },
  hashtag: "#KunalWedsShalini",
  targetDate: "2026-11-25T00:00:00+05:30",
  venue: "Sukrit Royal Palace, Purnia, Bihar",
  venueShort: "Sukrit Royal Palace",
  mapHref: "https://www.google.com/maps/place/Sukrit+royal+palace/data=!4m2!3m1!1s0x0:0xfc90016b73bf413f?sa=X&ved=1t:2428&hl=en-IN&ictx=111",
  events: [
    {
      date: "24 November 2026",
      title: "Haldi, Mehndi & Sangeet",
      time: "11:00 AM",
      venue: "Baby Niwas, Rambagh, Purnia",
      venueShort: "Baby Niwas Rambagh Purnia",
      mapHref: "https://www.google.com/maps/search/?api=1&query=Baby+Niwas+Rambagh+Purnia",
    },
    {
      date: "25 November 2026",
      title: "Wedding",
      time: "8:00 PM",
      venue: "Sukrit Royal Palace, Purnia, Bihar",
      venueShort: "Sukrit Royal Palace",
      mapHref: "https://www.google.com/maps/place/Sukrit+royal+palace/data=!4m2!3m1!1s0x0:0xfc90016b73bf413f?sa=X&ved=1t:2428&hl=en-IN&ictx=111",
    },
    {
      date: "12 Dec 2026",
      title: "Reception",
      time: "7:30 PM",
      venue: "Sukrit Royal Palace, Purnia, Bihar",
      venueShort: "Sukrit Royal Palace",
      mapHref: "https://www.google.com/maps/place/Sukrit+royal+palace/data=!4m2!3m1!1s0x0:0xfc90016b73bf413f?sa=X&ved=1t:2428&hl=en-IN&ictx=111",
    },
  ] as WeddingEvent[],
  confettiColors: ["#a11729", "#c9a227", "#e7c86b", "#2f5233", "#fbf6ec"],
  media: {
    envelope: {
      seal: "/weddings/sakshi-manav/envelope/ks_seal.png",
      pattern: "/weddings/sakshi-manav/envelope/pattern.avif",
    },
    opening: {
      ganpatiPoster: "/weddings/sakshi-manav/opening/ganpati-poster.avif",
      ganpatiVideo: "/weddings/sakshi-manav/opening/ganpati.mp4",
      templeWatercolor: "/weddings/sakshi-manav/opening/temple-watercolor.avif",
      names: "/weddings/sakshi-manav/opening/kunal_shalini_names.png",
      song: "/weddings/sakshi-manav/opening/song.m4a",
    },
    carnival: {
      bg: "/weddings/sakshi-manav/carnival/bg.avif",
      garland: "/weddings/sakshi-manav/carnival/garland.avif",
      couple: "/weddings/sakshi-manav/carnival/couple.avif",
      fireworks: "/weddings/sakshi-manav/carnival/fireworks.mp4",
    },
    wedding: {
      bg: "/weddings/sakshi-manav/wedding/bg.avif",
      fireworks: "/weddings/sakshi-manav/wedding/fireworks.mp4",
    },
    cocktail: {
      bg: "/weddings/sakshi-manav/cocktail/bg.avif",
      couple: "/weddings/sakshi-manav/cocktail/couple.avif",
      handLeft: "/weddings/sakshi-manav/cocktail/left_hand.avif",
      handRight: "/weddings/sakshi-manav/cocktail/right_hand.avif",
    },
    finale: {
      sky: "/weddings/sakshi-manav/finale/sky.avif",
      canopy: "/weddings/sakshi-manav/finale/canopy.avif",
      stage: "/weddings/sakshi-manav/finale/stage.avif",
    },
  },
};
