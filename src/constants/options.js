import { convertToDropdownOptions, convertCostStructureDropdownOptions  } from "../utils/helpers";

const costStructureArr = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "free",
    value: "free",
  },
  {

    label: "certificate-based",
    value: "certificate",
  },
  {
    label: "subscription-based",
    value: "subscription"
  },
];

const subjectArr = [
  "All",
  "Animation",
  "Architecture",
  "Art & Culture",
  "Big Data",
  "Biology & Life Sciences",
  "Blockchain",
  "Business & Management",
  "Business Analytics",
  "Business Essentials",
  "Communication",
  "Computer Science",
  "Chemistry",
  "Creative Writing",
  "Data Analysis & Statistics",
  "Data Analysis",
  "Data Science",
  "DevOps",
  "Economics & Finance",
  "Energy & Earth Sciences",
  "Entrepreneurship",
  "Environmental Studies",
  "Engineering",
  "Ethics",
  "Film and Video",
  "Fine Art",
  "Food & Nutrition",
  "Gaming",
  "Graphic Design",
  "Health & Safety",
  "Humanities",
  "Illustration",
  "Law",
  "Leadership",
  "Lifestyle",
  "Literature",
  "Medicine",
  "Math",
  "Marketing",
  "Music",
  "Physics",
  "Python",
  "Photography",
  "Science",
  "Writing and Publishing",
];

const providerArr = ["All", "EDX", "skillshare", "treehouse", "datacamp", "mindvalley", "google", "swayam", "yc"];


const costStructureDropdownOptions = convertCostStructureDropdownOptions(costStructureArr);
const subjectDropdownOptions = convertToDropdownOptions(subjectArr);
const providerDropdownOptions = convertToDropdownOptions(providerArr);
const lengthDropdownOptions = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "< 1 month",
    value: { minHours: 0, maxHours: 672 },
  },
  {
    label: "1-3 months",
    value: {
      minHours: 673,
      maxHours: 2016,
    },
  },
  {
    label: "> 3 months",
    value: {
      minHours: 2017,
      maxHours: 9999,
    },
  },
];

module.exports = {
  costStructureDropdownOptions,
  subjectDropdownOptions,
  lengthDropdownOptions,
  providerDropdownOptions,
};
