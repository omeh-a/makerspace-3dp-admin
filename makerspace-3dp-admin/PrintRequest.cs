﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace makerspace_3dp_admin
{
    /// <summary>
    /// In-memory representation of a PrintRequest directory.
    /// </summary>
    internal class PrintRequest
    {
        readonly string printName;
        private string author;
        private string project;
        private string staffMember;
        private string dir;
        readonly DateTime submitted;
        private Material material;

        public PrintRequest(string name, string author, string project, string staff, Material material)
        {
            this.printName = name;
            this.author = author;
            this.project = project;
            this.staffMember = staff;
            this.material = material;

            // Set time
            this.submitted = DateTime.Now;

            // Attempt to allocate a directory for this request
            
        }

    }
}
