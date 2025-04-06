import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { Follower, Following, GenericResponseProps, IFollowerService } from "../lib/types";

class FollowerService implements IFollowerService {
  private users = AppDataSource.getRepository(User);

  async followUser(selfId: string, userId: string): Promise<GenericResponseProps> {
    const user = await this.users.findOne({
      where: { id: userId }
    });
    const follower = await this.users.findOne({
      where: { id: selfId }
    });

    if (!user) {
      return {
        message: "Unable to follow account at this time",
        success: false
      }
    }

    const userFollowers: Array<Follower> = user?.followers ?? [];
    if (userFollowers.find(item => item.userId === selfId)) {
      return {
        message: "You are already following this account",
        success: true
      }
    }

    const now = new Date();
    const followingDataList: Array<Follower> = follower?.following ?? [];
    const followerData: Follower = {
      userId: selfId,
      date: now
    }

    const followingData: Following = {
      userId: userId,
      date: now
    }

    userFollowers.push(followerData);
    followingDataList.push(followingData);

    if (user) {
      await this.users.save(user);
    }
    if (follower) {
      await this.users.save(follower);
    }

    return {
      message: "You are now following " + user.email,
      success: true
    }
  }

  async unfollowUser(selfId: string, userId: string): Promise<GenericResponseProps> {
    const user = await this.users.findOne({
      where: { id: userId }
    });
    const follower = await this.users.findOne({
      where: { id: selfId }
    });

    if (!user || !follower) {
      return {
        message: "Unable to complete action at this time",
        success: false
      }
    }

    user.followers = user?.followers.filter(item => item.userId !== selfId);
    await this.users.save(user);

    follower.following = follower?.following.filter(item => item.userId !== userId);
    await this.users.save(follower);

    return {
      message: "You have unfollowed " + user.email,
      success: true
    }
  }

  async getFollowers(id: string): Promise<GenericResponseProps> {
    const followers = (await this.users.findOne({ where: { id }, select: ["followers"] }))?.followers;
    if (!followers) return {
      success: false,
      message: "Unable to retrieve followers at this time"
    }

    return {
      success: true,
      message: "Followers retrieved successfully",
      data: followers
    }
  }

  async getFollowing(id: string): Promise<GenericResponseProps> {
    const following = (await this.users.findOne({ where: { id }, select: ["following"] }))?.following;
    if (!following) return {
      success: false,
      message: "Unable to retrieve data at this time"
    }

    return {
      success: true,
      message: "Data retrieved successfully",
      data: following
    }
  }
}

export default FollowerService;
