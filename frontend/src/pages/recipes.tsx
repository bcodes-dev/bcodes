import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./recipes.css";

const recipes = [
  {
    name: "Black Pepper Noodles",
    ingredients: [
      "Sweet Pointed Pepper", 
      "Spring Onions", 
      "Garlic", 
      "Veggie Pieces", 
      "Noodles (3 blocks)", 
      "Cornstarch",
      "Soy Sauce", 
      "White Wine Vinegar", 
      "Brown Sugar", 
      "Black Pepper", 
      "Chili Powder"
    ],
    preparation: [
      "Mix 2 tbsp of soy sauce, 1 tbsp of cornstarch and a pinch of black pepper and chili powder in a big bowl.", 
      "Coat the veggie pieces in this mixture and set aside", 
      "Mix 6 tbsp of soy sauce, 2 tbsp of white wine vinegar, 1 tbsp of brown sugar and 1 tbsp of black pepper in a soup bowl",
      "Cut the pepper, spring onions, and garlic into small pieces.", 
      "Set a pot of water to boil.", 
      "Heat a pan with some oil and stir-fry the veggie pieces.", 
      "Add the  garlic, pepper and half of the spring onion and stir-fry until cooked through.", 
      "Add the noodles to the boiling water and cook.",
      "Add the soy sauce mixture to the pan and stir until the noodles are done (+-4 minutes).",
      "Serve with the other half of the spring onion sprinkled on top!"],
  },
  {
    name: "Ravioli Ricotta",
    ingredients: [
      "Spinach Ravioli", 
      "1 Leek", 
      "Ricotta", 
      "Veggie Minced Meat", 
      "Couple of Walnuts", 
      "Grated Cheese"
    ],
    preparation: [
      "Set a pot of water to boil.", 
      "Cut the leek into small pieces", 
      "Preheat the oven to 200 degrees Celsius.",
      "Stirfry the leek and veggie minced meat in a pan until cooked through.", 
      "Cook the ravioli in the boiling water.",
      "Mix the ricotta with the leek and veggie minced meat.", 
      "Mix the ravioli with the ricotta mixture and put it in an oven dish.",
      "Sprinkle the grated cheese and walnuts on top and put it in the oven for 10 minutes or until the cheese is golden brown."
    ],
  },
]

export default function Recipes() {
  return (
    <div className="recipes-page">
      <h1 className="recipes-title">Recipes</h1>

      {recipes.map((recipe) => (
        <Accordion
          key={recipe.name}
          sx={{
            backgroundColor: "#2a2a2a",
            color: "#e0e0e0",
            marginBottom: "0.75rem",
            borderRadius: "8px !important",
            "&:before": { display: "none" },
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#aaa" }} />}
            sx={{
              "& .MuiAccordionSummary-content": { margin: "0.25rem 0" },
            }}
          >
            <h3 className="recipe-name">{recipe.name}</h3>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "0.5rem 1rem 1rem" }}>
            <Accordion
              sx={{
                backgroundColor: "#333",
                color: "#d0d0d0",
                marginBottom: "0.5rem",
                borderRadius: "6px !important",
                "&:before": { display: "none" },
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#aaa" }} />}
                sx={{ fontWeight: 500 }}
              >
                Ingredients
              </AccordionSummary>
              <AccordionDetails>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                backgroundColor: "#333",
                color: "#d0d0d0",
                borderRadius: "6px !important",
                "&:before": { display: "none" },
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#aaa" }} />}
                sx={{ fontWeight: 500 }}
              >
                Preparation
              </AccordionSummary>
              <AccordionDetails>
                <ol className="preparation-list">
                  {recipe.preparation.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}