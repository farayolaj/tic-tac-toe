import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import FlexRow from "../components/FlexRow";
import ToggleButton from "../components/ToggleButton";

export default function Home({
  comp,
  onFormSubmit,
  onToggle,
  level,
  onLevelChanged,
}) {
  return (
    <Container>
      <Card>
        <h1>Tic Tac Toe</h1>
        <form onSubmit={onFormSubmit}>
          <FlexRow>
            <div>
              <span style={{ margin: "10px" }}>Play against Computer</span>
            </div>
            <ToggleButton id="comp" value={comp} onToggle={onToggle} />
          </FlexRow>
          <label htmlFor="level">
            <span style={{ margin: "10px" }}>Level</span>
          </label>
          <select
            id="level"
            disabled={!comp}
            value={level}
            onChange={onLevelChanged}
          >
            <option value={true}>Easy</option>
            <option value={false}>Hard</option>
          </select>
          <br />
          <Button type="submit">Start Button</Button>
        </form>
      </Card>
    </Container>
  );
}
