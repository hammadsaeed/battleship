import { motion } from "framer-motion";
import { TILETYPE } from "../../types/index.d";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: () => {
    const delay = 0.1;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};
interface ICross {
  type: TILETYPE;
}

const Cross = (props: ICross) => {
  const { type } = props;
  const color = TILETYPE.HIT === type ? "red" : "black";
  const size = 20;

  const lineProps = {
    stroke: color,
    strokeWidth: size / 10,
  };
  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      width={size}
      height={size}
      key={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.line
        x1={size * 0.1}
        y1={size * 0.1}
        x2={size * 0.9}
        y2={size * 0.9}
        variants={draw}
        {...lineProps}
      />
      <motion.line
        x1={size * 0.1}
        y1={size * 0.9}
        x2={size * 0.9}
        y2={size * 0.1}
        variants={draw}
        {...lineProps}
      />
    </motion.svg>
  );
};

export default Cross;
