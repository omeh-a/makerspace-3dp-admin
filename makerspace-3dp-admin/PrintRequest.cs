using System;
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
        private int copies;
        readonly DateTime submitted;
        private Material material;

        /// <summary>
        /// General constructor
        /// </summary>
        /// <param name="name"></param>
        /// <param name="author"></param>
        /// <param name="project"></param>
        /// <param name="staff"></param>
        /// <param name="copies"></param>
        /// <param name="material"></param>
        public PrintRequest(string name, string author, string project, string staff, int copies, Material material)
        {
            this.printName = name;
            this.author = author;
            this.project = project;
            this.staffMember = staff;
            this.material = material;
            this.copies = copies;
            this.dir = this.dir = $"{this.submitted.ToString()}|{this.printName}|{this.author}|{this.material.ToString()}";

            // Set time
            this.submitted = DateTime.Now;

            // Attempt to allocate a directory for this request
            
        }
        public string getDir()
        {
            return this.dir;
        }

        /// <summary>
        /// Fuzzy constructor.
        /// Given input read in from a user's text file, try and assemble a print
        /// request.
        /// </summary>
        /// <param name="author"></param>
        /// <param name="project"></param>
        /// <param name="copies"></param>
        /// <param name="tech"></param>
        /// <param name="material"></param>
        /// <param name="staff"></param>
        /// <returns></returns>
        public PrintRequest(string? author, string? project, string? copies,
                                    string? tech, string? material, string? staff)
        {
            if (author != null)
            {
                this.author = author;
            } else { this.author = "unknown"; }

            if (project != null)
            {
                this.project = project;
            }
            else { this.project = "unknown"; }

            if (copies != null)
            {
                this.copies = int.Parse(copies);
            }
            else { this.copies = 1; }
            if (staff != null)
            {
                this.staffMember = staff;
            }
            else { this.staffMember = "unknown"; }
            this.material = new Material(TechType.UNKNOWN, MaterialType.UNKNOWN, "unknown", "", true);
            
        }
    }
}
