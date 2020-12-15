using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChattyCathy.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string ImageUrl { get; set; }

        public int Sentiment { get; set; }

        public string FBuid { get; set; }
    }
}
