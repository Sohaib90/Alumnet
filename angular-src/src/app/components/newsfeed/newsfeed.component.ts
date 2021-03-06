import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {PostsService} from '../../services/posts.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';


@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  posts: Object;
  user_id: any;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService:AuthService,
    private postsService: PostsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(data => {
      this.posts = data.posts;
    },
    err => {
  	  console.log(err);
  	  return false;
    });

    this.authService.getProfile().subscribe(profile => {
      this.user_id = profile.user._id;
    },
    err => {
  	  console.log(err);
  	  return false;
    });
  }

  onCommentSubmit(post_id, comment) {
    const newComment = {
      post_id: post_id,
      user_id: this.user_id,
      comment_msg: comment
    };

    // Add Comment
    this.postsService.addComment(newComment).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Comment Posted', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/newsfeed']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/newsfeed']);
      }
    });

    // Force Refresh
    this.postsService.getPosts().subscribe(data => {
      this.posts = data.posts;
    },
    err => {
  	  console.log(err);
  	  return false;
    });
  }

}
