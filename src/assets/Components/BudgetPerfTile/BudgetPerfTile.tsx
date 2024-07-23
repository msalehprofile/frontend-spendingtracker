import { Paper } from "@mui/material";
import "./BudgetPerfTile.scss";

type BudgetPerfTileProps = {
  category: string;
  amountSpent: string | number;
  budget: number;
};

const BudgetPerfTile = ({
  category,
  amountSpent,
  budget,
}: BudgetPerfTileProps) => {
  return (
    <div>
      <Paper className="budgettile">
        <p className="budgettile__subheading">{category}</p>
        <p className="budgettile__spent">
          £{amountSpent} out of £{budget} spent
        </p>
      </Paper>
    </div>
  );
};

export default BudgetPerfTile;
