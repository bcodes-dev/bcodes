import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./recipes.css";
import recipes from "../config/recipes";



export default function Recipes() {
  const [openRecipe, setOpenRecipe] = useState<string | null>(null);

  const handleChange = (name: string) => {
    setOpenRecipe(openRecipe === name ? null : name);
  };

  const sortedRecipes = useMemo(() => {
    if (!openRecipe) return recipes;
    return [...recipes].sort((a, b) =>
      a.name === openRecipe ? -1 : b.name === openRecipe ? 1 : 0
    );
  }, [openRecipe]);

  return (
    <div className="recipes-page">
      <h1 className="recipes-title">Recipes</h1>

      <AnimatePresence mode="popLayout">
      {sortedRecipes.map((recipe) => (
        <motion.div
          key={recipe.name}
          layout
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: openRecipe && openRecipe !== recipe.name ? 0 : 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ pointerEvents: openRecipe && openRecipe !== recipe.name ? "none" : "auto" }}
        >
          <Accordion
            expanded={openRecipe === recipe.name}
            onChange={() => handleChange(recipe.name)}
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
        </motion.div>
      ))}
      </AnimatePresence>
    </div>
  );
}