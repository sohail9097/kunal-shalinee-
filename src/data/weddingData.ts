export interface PersonInfo {
  name: string;
  hindiName: string;
  parents: string;
  grandparents?: string;
}

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
    name: "Dr. Shalinee",
    hindiName: "शालिनी",
    parents: "D/O Mr. Vidyasagar Mahaseth & Mrs. Anju Devi ",
    grandparents: "",
  } as PersonInfo,
  groom: {
    name: "Dr. Kunal",
    hindiName: "कुणाल",
    parents: "S/O Mr. Subodh Prasad & Mrs.Baby Devi ",
    grandparents: "",
  } as PersonInfo,
  hashtag: "#Kunal Weds Shalinee",
  targetDate: "2026-11-25T00:00:00+05:30",
  venue: "Kala Bhawan Purnea, Bihar",
  venueShort: "Kala Bhawan Purnea",
  mapHref: "https://www.google.com/maps/place/Sukrit+royal+palace/data=!4m2!3m1!1s0x0:0xfc90016b73bf413f?sa=X&ved=1t:2428&hl=en-IN&ictx=111",
  events: [
    {
      date: "24 November 2026",
      title: "Haldi",
      time: "10:00 AM",
      venue: "Baby Niwas, Rambagh, Purnia",
      venueShort: "Baby Niwas Rambagh Purnia",
      mapHref: "https://www.google.com/maps/search/?api=1&query=Baby+Niwas+Rambagh+Purnia",
    },
    {
      date: "24 November 2026",
      title: "Mehndi & Sangeet",
      time: "5:00 PM",
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
      mapHref: "https://maps.app.goo.gl/PK5G4UrPRp9DyoHq6",
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
    mehndi: {
      // Change Mehndi & Sangeet images here:
      bg: "/weddings/sakshi-manav/carnival/mehndi-bg.avif",
      garland: "/weddings/sakshi-manav/carnival/garland.avif",
      couple: "/weddings/sakshi-manav/carnival/mehndi-couple.avif",
      fireworks: undefined as string | undefined,
    },
    wedding: {
      bg: "/weddings/sakshi-manav/wedding/bg.jpg",
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
