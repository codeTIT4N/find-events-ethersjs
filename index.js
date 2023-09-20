const ethers = require("ethers");
const abi = require("./abi.json");
const fs = require("fs");

(async () => {
  const rpc = new ethers.getDefaultProvider("https://polygon.llamarpc.com");
  const rewardsContract = "0x1629179ec4e32F81E94688c608f6eC48BA949e84";
  const startBlock = 47744400;
  const endBlock = "latest";
  console.log(
    "Finding event 'GemsAdded' from block " + startBlock + " to " + endBlock,
  );
  const Contract = new ethers.Contract(rewardsContract, abi, rpc);
  const eventFilter = Contract.filters.GemsAdded();
  const gemsAddedEvents = await Contract.queryFilter(
    eventFilter,
    startBlock,
    endBlock,
  );
  console.log(gemsAddedEvents);
  // put the gemsAddedEvents in a file which can be updated
  fs.writeFile(
    "GemsAddedEvents.json",
    JSON.stringify(gemsAddedEvents, null, 4),
    function (err) {
      if (err) throw err;
      console.log("Saved! Check GemsAddedEvents.json");
    },
  );
  console.log("Done!");
})();
