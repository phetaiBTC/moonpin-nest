import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>
  ) {

  }
  async create(createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create({
      rating: createReviewDto.rating,
      comments: createReviewDto.comments,
      status: createReviewDto.status,
      users: { id: createReviewDto.users },
      hotels: { id: createReviewDto.hotels },
    });
    await this.reviewRepository.save(review)
    return {
      message:"create review successfull",
      item:review
    }

  }

  findAll() {
    return this.reviewRepository.find()
  }

  findOne(id: number) {
    return this.reviewRepository.findOneBy({id})
  }

   async remove(id: number) {
    await this.reviewRepository.delete(id)
    return {
      message:"delete review successfully",
    }
  }
}
