import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const recipes = [
  {
    name: "Pasta",
    ingredients: "Tomatoes, garlic, olive oil, pasta, salt, pepper",
    preparation: "1. Boil water and cook pasta. 2. Sauté garlic in olive oil. 3. Add tomatoes and simmer. 4. Combine with cooked pasta.",
  },
  {
    name: "Pancakes",
    ingredients: "Flour, milk, eggs, baking powder, sugar, butter",
    preparation: "1. Mix flour, baking powder, and sugar. 2. Beat eggs with milk. 3. Combine and cook on griddle. 4. Serve warm with toppings.",
  },
];

export default function Recepies() {
  return (
    <div style={{ padding: "2rem", backgroundColor: "#1a1a1a"}}>
      <h1 style={{ color: "white" }}>Recepies</h1>

      {recipes.map((recipe) => (
        <Accordion key={recipe.name}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3>{recipe.name}</h3>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Ingredients
                </AccordionSummary>
                <AccordionDetails>
                  <p>{recipe.ingredients}</p>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Preparation
                </AccordionSummary>
                <AccordionDetails>
                  <p>{recipe.preparation}</p>
                </AccordionDetails>
              </Accordion>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}