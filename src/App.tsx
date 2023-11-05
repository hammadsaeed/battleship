import Board from "./components/Board";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <Board />
      </div>
    </div>
  );
}

export default App;
