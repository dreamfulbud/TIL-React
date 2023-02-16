import Square from "./Square";

function Board(props) {
  return (
    <div>
      <div className="first">
        <Square value={1} {...props} />
        <Square value={2} {...props} />
        <Square value={3} {...props} />
      </div>
      <div>
        <Square value={4} {...props} />
        <Square value={5} {...props} />
        <Square value={6} {...props} />
      </div>
      <div>
        <Square value={7} {...props} />
        <Square value={8} {...props} />
        <Square value={9} {...props} />
      </div>
    </div>
  );
}

export default Board;
