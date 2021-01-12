const express = require('express');
const knex = require('../db/client');
const router = express.Router();


router.get('/new', (request, response) => {
    response.render('cohorts/new', { cohort: false });
  });
  router.get('/home', (request, response) => {
    response.render('cohorts/home', { cohort: false });
  });
  router.get('/', (request, response) => {
    knex
    .select('*')
    .from('cohorts')
      .orderBy('created_at', 'desc')
      .then(cohorts=> {
        response.render('cohorts/index', { cohorts: cohorts });
      });
  });

  
  router.post('/',(request,response)=>{
    knex('cohorts')
    .insert({
     members: request.body.members,
        name: request.body.name,
      logo_url: request.body.logo_url
      
    })
    .returning('*')
    .then(cohorts=> {
       
        const cohort = cohorts[0];
       //response.send(cohort);
        response.redirect(`/cohorts/${cohort.id}`)
    });
});
router.get('/:id', (request, response) => {
    
  knex('cohorts')
    .where('id', request.params.id)
    .first()
   
    .then(cohort => {
      //res.send(cohort);
        response.render('cohorts/show', { cohort:cohort, teamSplit:false });
      
    });
});
//router.post('show/:id', (request, response) => {
router.post('/:id', (request, response) => {
  knex('cohorts')
  .where('id', request.params.id)
  .first()
 
  .then(cohort => {
    //res.send(cohort);

    let members = cohort.members;
    //console.log("members", members)
    let quantity = request.body.quantity;
    //console.log("quantity", quantity);
    let assignment = request.body.assignment;
    //console.log("assignment", assignment);
   //console.log(assignment)
   const name_array = members.split(",");
   console.log("name_array", name_array,"array length",name_array.length);
    rows =Math.ceil(name_array.length/quantity);
    //console.log("rows", rows)



    function teamCount(arr,quan){
      teams = [];
      while(quan>0){
        teams.push(arr.splice(0,Math.floor(arr.length/quan)))
        quan--
        
      }

      return teams
     
    }
   

    function numPerTeam(array,quantity,rows)
    {
      split=[]
      while(rows>0){
        split.push(array.splice(0,quantity))
        rows--;
      }
      return split;
    }
    if(assignment ==="team_count")
    {
      teamSplit = teamCount(name_array,quantity);
    
    }
    else {
      teamSplit= numPerTeam(name_array,quantity,rows);
    }

      response.render('cohorts/show', { cohort:cohort,  teamSplit:teamSplit});
    //quantity:quantity, assignment:assignment ,members:members,
  });
 
})

// EDIT
router.get('/:id/edit', (request, response) => {
  knex('cohorts')
    .where('id', request.params.id)
    .first()
    .then(cohort => {
      response.render('cohorts/edit', { cohort: cohort});
    });
});

// UPDATE
router.patch('/:id', (request, response) => {
  knex('cohorts')
    .where('id', request.params.id)
    .update({
      members: request.body.members,
        name: request.body.name,
      logo_url: request.body.logo_url
    })
    .returning('*')
    .then((cohort) => {
      //response.redirect(`/cohorts/${request.params.id}`);
      response.redirect(`/cohorts/${request.params.id}`);
    });
})

// Destroy
// DELETE /posts/:id
router.delete('/:id', (request, response) => {
  knex('cohorts')
    .where('id', request.params.id)
    .del()
    .then(() => {
      response.redirect('/cohorts');
    });
});




























module.exports = router;