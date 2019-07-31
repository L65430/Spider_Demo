"use strict";
const Promise = require('es6-promise').Promise;
const request = require('request');
const config = require('../../config');

const API = {
    'startPic'  : 'http://news-at.zhihu.com/api/4/start-image/720*1184',
    'latest'    : 'http://news-at.zhihu.com/api/4/news/latest',
    'article'   : 'http://news-at.zhihu.com/api/4/news/',
    'history'   : 'http://news.at.zhihu.com/api/4/news/before/',
    'cmtCount'  : 'http://news-at.zhihu.com/api/4/story-extra/',
    'cmtLong'   : 'http://news-at.zhihu.com/api/4/story/',
    'cmtShort'  : 'http://news-at.zhihu.com/api/4/story/'
}

module.exports = {
    getStartPic(){
        var url = API.startPic;
        return new Promise(function(resolve, reject){
            request(url, function(err,response,body){
                var pic = null;
                if(!err){
                    var latest = JSON.parse(body);
                    resolve(latest);
                }else {
                    return reject(err);
                }
            });    
        });
    },
    // 最新内容
    getLatest(){
        var url = API.latest;
        return new Promise(function(resolve, reject){
            request({
                method: 'GET',
                uri: url,
                headers: {'Authorization': config.auth }
            },function(err, response, body){
                var latest = null;
                if(!err){
                    var latest = JSON.parse(body);
                    resolve(latest);
                }else {
                    return reject(err)
                }
            });        
            
        });
    },
    // 文章详情
    getArticle(articleId){
        return new Promise(function(resolve, reject){
            if(articleId) {
                var url = API.article + articleId;
                request({
                    method: 'GET',
                    uri: url,
                    headers: { 'Authorization': config.auth }
                }, function(err, response, body){
                    if(err){
                        return reject(err);
                    }else {
                        resolve(JSON.parse(body));
                    }
                });
            }else {
                reject(null);
            }
        })
    },
    // 评论数点赞数
    getCmtcount(articleId){
        return new Promise(function(resolve, reject){
            if(articleId){
                var url = API.cmtCount + articleId;
                request({
                    method: 'GET',
                    uri: url,
                    headers: { 'Authorization': config.auth }
                }, function(err, response, body){
                    if(err){
                        return reject(err);
                    }else {
                        resolve(JSON.parse(body));
                    }
                });
            }else {
                reject(null);
            }

        });               
    },
    // 长评论
    getCmtLong(articleId){
        return new Promise(function(resolve, reject){
            if(articleId){
                var url = API.cmtLong + articleId + '/long-comments';
                request({
                    method: 'GET',
                    uri: url,
                    headers: { 'Authorization': config.auth }
                }, function(err, response, body){
                    if(err){
                        return reject(err);
                    }else {
                        resolve(JSON.parse(body));
                    }
                });
            }else {
                reject(null);
            }

        });               
    },
    // 短评论
    getCmtshort(articleId){
        return new Promise(function(resolve, reject){
            if(articleId){
                var url = API.cmtShort + articleId + '/short-comments';
                request({
                    method: 'GET',
                    uri: url,
                    headers: { 'Authorization': config.auth }
                }, function(err, response, body){
                    if(err){
                        return reject(err);
                    }else {
                        resolve(JSON.parse(body));
                    }
                });
            }else {
                reject(null);
            }

        });               
    },
    getHistory(date){
        return new Promise(function(resolve, reject){
            if(date){
                var url = API.history + date;
                request({
                    method: 'GET',
                    uri: url,
                    headers: { 'Authorization': config.auth }
                }, function(err, response, body){
                    if(err){
                        return reject(err);
                    }else {
                        resolve(JSON.parse(body));
                    }
                });
            }else {
                reject(null);
            }

        });
    }
}