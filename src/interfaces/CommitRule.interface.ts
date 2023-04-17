export interface CommitRule {
  commitFormat: string;
  typeOfCommit: [
    {
      type: string;
      description: string;
    },
  ];
  localRules: string[];
}
