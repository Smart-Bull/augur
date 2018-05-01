import * as Knex from "knex";

exports.seed = async (knex: Knex): Promise<any> => {
  // Deletes ALL existing entries
  return knex("markets").del().then(async (): Promise<any> => {
    // Inserts seed entries
    const seedData = [{
      marketId: "0x0000000000000000000000000000000000000001",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "categorical",
      numOutcomes: 8,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400000,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "test tag 1",
      tag2: "test tag 2",
      volume: "0",
      sharesOutstanding: "0",
      marketStateId: 1,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1506573470,
      shortDescription: "This is a categorical test market created by b0b.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000002",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "binary",
      numOutcomes: 2,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400100,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "test tag 1",
      tag2: "test tag 2",
      volume: "0",
      sharesOutstanding: "0",
      marketStateId: 2,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1506573480,
      shortDescription: "This is a binary test market created by b0b.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000003",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "binary",
      numOutcomes: 2,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x000000000000000000000000000000000000d00d",
      creationBlockNumber: 1400101,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "test tag 1",
      tag2: "test tag 2",
      volume: "0",
      sharesOutstanding: "0",
      marketStateId: 3,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1506573500,
      shortDescription: "This is another binary test market created by d00d.",
      designatedReporter: "0x000000000000000000000000000000000000d00d",
      designatedReportStake: "10",
      resolutionSource: "http://www.ttp-inc.com/0000000000000000000000000000000000000003",
      numTicks: 10000,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000011",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "categorical",
      numOutcomes: 8,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "test tag 1",
      tag2: "test tag 2",
      volume: "0",
      sharesOutstanding: "0",
      marketStateId: 4,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1507573470,
      shortDescription: "This is a categorical (8) test market created by b0b awaiting round 1 reporting.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000012",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "binary",
      numOutcomes: 2,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "Finance",
      tag2: "Augur",
      volume: "10",
      sharesOutstanding: "100",
      marketStateId: 5,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1507573470,
      shortDescription: "This is a binary test market created by b0b, designated reporting",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000013",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "binary",
      numOutcomes: 2,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "Finance",
      tag2: "Augur",
      volume: "10",
      sharesOutstanding: "1000",
      marketStateId: 6,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1507573470,
      shortDescription: "creator by b0b, binary market, in awaiting finalization",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000014",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "categorical",
      numOutcomes: 5,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "politics",
      tag2: "ethereum",
      volume: "10",
      sharesOutstanding: "100",
      marketStateId: 7,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1507573470,
      shortDescription: "created by b0b, 5 outcomes, designated reporting state.~|>a|b|c|d|e",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000015",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "categorical",
      numOutcomes: 4,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "tagging it",
      tag2: "tagged it",
      volume: "10",
      sharesOutstanding: "10",
      marketStateId: 8,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1507573470,
      shortDescription: "creator b0b, 4 outcomes in designated reporting state.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000016",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "categorical",
      numOutcomes: 7,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "tagging it",
      tag2: "tagged it",
      volume: "10",
      sharesOutstanding: "10",
      marketStateId: 9,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1507573470,
      shortDescription: "creator b0b, 7 outcomes, in designated reporting.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 949,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000017",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "categorical",
      numOutcomes: 7,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "tagging it",
      tag2: "tagged it",
      volume: "10",
      sharesOutstanding: "10",
      marketStateId: 10,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1507573470,
      shortDescription: "creator b0b, 7 outcomes, in designated reporting.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10003,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000018",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "categorical",
      numOutcomes: 7,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "tagging it",
      tag2: "tagged it",
      volume: "10",
      sharesOutstanding: "10",
      marketStateId: 11,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1507573470,
      shortDescription: "creator b0b, 7 outcomes, round 1 reporting.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10003,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000019",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "categorical",
      numOutcomes: 5,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1400001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "tagging it",
      tag2: "tagged it",
      volume: "10",
      sharesOutstanding: "10",
      marketStateId: 12,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 1507573470,
      shortDescription: "creator b0b 5 outcomes, market finalized.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000211",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "binary",
      numOutcomes: 2,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1500001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "test tag 1",
      tag2: "test tag 2",
      volume: "0",
      sharesOutstanding: "0",
      marketStateId: 15,
      feeWindow: "0x2000000000000000000000000000000000000000",
      endTime: 1507573470,
      shortDescription: "This is a binary test market created by b0b awaiting round 1 reporting.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
      initialReportSize: "10",
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000222",
      universe: "0x000000000000000000000000000000000000000b",
      marketType: "binary",
      numOutcomes: 2,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1500001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "test tag 1",
      tag2: "test tag 2",
      volume: "0",
      sharesOutstanding: "0",
      marketStateId: 16,
      feeWindow: "0x1000000000000000000000000000000000000000",
      endTime: 2506573480,
      shortDescription: "This is a binary test market created by b0b in pre_reporting.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
      forking: 0,
    }, {
      marketId: "0x0000000000000000000000000000000000000233",
      universe: "CHILD_UNIVERSE",
      marketType: "binary",
      numOutcomes: 2,
      minPrice: "0",
      maxPrice: "1",
      marketCreator: "0x0000000000000000000000000000000000000b0b",
      creationBlockNumber: 1500001,
      creationFee: "10",
      reportingFeeRate: "0.02",
      marketCreatorFeeRate: "0.01",
      category: "test category",
      tag1: "test tag 1",
      tag2: "test tag 2",
      volume: "0",
      sharesOutstanding: "0",
      marketStateId: 16,
      feeWindow: "0x4000000000000000000000000000000000000000",
      endTime: 2506573480,
      shortDescription: "This is a binary test market created by b0b in pre_reporting.",
      designatedReporter: "0x0000000000000000000000000000000000000b0b",
      designatedReportStake: "10",
      resolutionSource: "http://www.trusted-third-party.com",
      numTicks: 10000,
    }];
    return knex.batchInsert("markets", seedData, seedData.length);
  });
};
