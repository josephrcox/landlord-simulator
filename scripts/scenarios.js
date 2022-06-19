export const scenarios_list = [
    {
        title:"Your residents are fed up with their crappy dial-up speed internet, but unfortunately the fix costs quite a bit of dough.",
        a:"Upgrade internet for all (-$100,000, +Rating)",
        b:"Tell them to deal with it! (-Rating)",
        a_outcome:"cash,-100000&rating,20",
        b_outcome:"rating,-10",
        alertMSG:"",
        requiresPool:false
    },
    {
        title:"An entrepreneur approaches you with a deal. They want to start selling knives door to door, bypassing normal security procedures.",
        a:"Say no",
        b:"Say yes",
        a_outcome:"",
        b_outcome:"alert,&cash,-50000&residents,-2&rating,-30",
        alertMSG:"Two residents are unfortunately stabbed in their apartments. The cops have no leads, but you must now pay $50,000 for the cleanup",
        requiresPool:false
    },
    {
        title:"The complex pool has been overtaken by wild squirrels.",
        a:"Pay each resident $100 to attack the squirrels and reclaim what is rightfully theirs",
        b:"Understand that the pool is no longer yours, and that is ok",
        a_outcome:"cashPerResident,-50&residents,-3&alert,",
        b_outcome:"amenities_pool,false",
        alertMSG:"The squirrels have been defeated, but 3 residents did not like your request and have found new homes elsewhere",
        requiresPool:true,
    },
    {
        title:"You get an email from someone claiming that they can make your residents a bit happier for the small price of $7k/month + $12/resident/month. Their resume looks legit and they have glowing references.",
        a:"Hire them",
        b:"Not a good fit",
        a_outcome:"salary,-7000&rating,20",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
    },
    {
        title:"You get an email from someone claiming that they can make your residents a bit happier for the small price of $7k/month + $12/resident/month. Their resume looks legit and they have glowing references.",
        a:"Hire them",
        b:"Not a good fit",
        a_outcome:"rentalAssistant,1&salary,-7000&rating,20",
        b_outcome:"",
        alertMSG:"",
        requiresPool:false,
    },
    {
        title:"One of your apartment buildings has burned down. Luckily, nobody was hurt. ",
        a:"",
        b:"",
        a_outcome:"",
        b_outcome:"",
        alertMSG:"",
    },
]



/* 

{
    title:"",
    a:"",
    b:"",
    a_outcome:"",
    b_outcome:"",
    alertMSG:"",
},

*/