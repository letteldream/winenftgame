import {
  //   TokenIPFSPathUpdated as TokenIPFSPathUpdatedEvent,
  Transfer as TransferEvent,
  Upgrade as TokenContract,
} from "../generated/Upgrade/Upgrade";

import { UpgradeToken, User } from "../generated/schema";

export function handleUpgradeTransfer(event: TransferEvent): void {
  let token = UpgradeToken.load(event.params.tokenId.toString());
  if (!token) {
    token = new UpgradeToken(event.params.tokenId.toString());
    token.creator = event.params.to.toHexString();
    token.tokenID = event.params.tokenId;

    let tokenContract = TokenContract.bind(event.address);
    token.contentURI = tokenContract.tokenURI(event.params.tokenId);
    // token.tokenIPFSPath = tokenContract.getTokenIPFSPath(event.params.tokenId);
    token.name = tokenContract.name();
    token.createdAtTimestamp = event.block.timestamp;
  }
  token.owner = event.params.to.toHexString();
  token.save();

  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
