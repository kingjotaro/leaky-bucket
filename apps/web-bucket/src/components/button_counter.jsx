import getreq from "./script";
function Button_counter(props) {
  const { sucess_count, SetSucess_count, fail_count, SetFail_count, SetFlag, data1, SetData1 } =
    props;

  async function runRequests() {
    for (let i = 0; i < 10; i++) {
      const { status } = await getreq();
      if (status === 200) {
        await SetSucess_count((prevData) => prevData + 1)

      } else {
        await SetFail_count((prevData) => prevData + 1)
      }
    }
    SetFlag(true);
  }
  return (
    <div>
      <button onClick={runRequests}>Make API Calls</button>
      <div>Success Count: {sucess_count}</div>
      <div>Fail Count: {fail_count}</div>
    </div>
  );
}

export default Button_counter;
