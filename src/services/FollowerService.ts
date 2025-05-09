import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { Follower, Following, GenericResponseProps, IFollowerService } from "../lib/types";

class FollowerService implements IFollowerService {
  private users = AppDataSource.getRepository(User);

  async followUser(selfId: number, userId: number): Promise<GenericResponseProps> {
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

  async unfollowUser(selfId: number, userId: number): Promise<GenericResponseProps> {
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

  async getFollowers(id: number): Promise<GenericResponseProps> {
    const followers = (await this.users.findOne({ where: { id }, select: ["followers"] }))?.followers;
    if (!followers) return {
      success: false,
      message: "Unable to retrieve followers at this time"
    }

    const followerPromises = followers.map(async (item) => {
      return await this.users.findOne({
        where: { id: item.userId },
        select: ["email", "username", "picture"]
      });
    });

    const followersData = await Promise.all(followerPromises);

    return {
      success: true,
      message: "Followers retrieved successfully",
      data: followersData.filter(Boolean)
    }
  }

  async getFollowing(id: number): Promise<GenericResponseProps> {
    const following = (await this.users.findOne({ where: { id: id }, select: ["following"] }))?.following;
    if (!following) return {
      success: false,
      message: "Unable to retrieve data at this time"
    }

    const followerPromises = following.map(async (item) => {
      return await this.users.findOne({
        where: { id: item.userId },
        select: ["email", "username", "picture"]
      });
    });

    const followingData = await Promise.all(followerPromises);

    return {
      success: true,
      message: "Data retrieved successfully",
      data: followingData.filter(Boolean)
    }
  }
}

export default FollowerService;
