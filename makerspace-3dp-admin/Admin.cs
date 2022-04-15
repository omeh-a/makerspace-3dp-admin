using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Configuration;
using System.Collections.Specialized;
using Microsoft.Win32;

namespace makerspace_3dp_admin
{
    /// <summary>
    /// The main orchestation point for this project.
    /// </summary>
    internal class Admin
    {
        private static Admin? _instance;
        private Queue<PrintRequest> printQueue;
        private Queue<PrintRequest> printingQueue;

        /// <summary>
        /// Singleton constructor
        /// </summary>
        private Admin()
        {
            this.printingQueue = new Queue<PrintRequest>();
            this.printQueue = new Queue<PrintRequest>();
        }

        /// <summary>
        /// Generate a new instance of Admin and read in existing print requests from the filesystem
        /// </summary>
        public static void Init()
        {
            Console.WriteLine("Building admin subsystem...");
            // Populate instance
            _instance = new Admin();

            // Read config file
            string? dir = System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            if (dir == null)
            {
                MessageBoxResult err = MessageBox.Show("System failed to find current execution location! This should never happen, try restarting the program.", "Error");
            }

            // Retrieve print queue location
            string? pqDir = ConfigurationManager.AppSettings.Get("printQueueDir");
            
            // Prompt user to set directory if it doesn't exist
            if (pqDir == "")
            {
                System.Windows.Forms.FolderBrowserDialog ofd = new System.Windows.Forms.FolderBrowserDialog();
                ofd.ShowDialog();
                ConfigurationManager.AppSettings.Set("printQueueDir", ofd.SelectedPath);
                
            }

        }

        /// <summary>
        /// Create a new job folder and add it to the print queue.
        /// Additionally stores this job as a folder inside of /jobs/toPrint.
        /// </summary>
        /// <returns>JobStatus indicating success or failure.</returns>
        public JobStatus createNewJob()
        {
            return JobStatus.Success;
        }

        /// <summary>
        /// Extract an element from the print queue and move it to
        /// the printing queue. Fails if the provided job is NOT in 
        /// the print queue.
        /// 
        /// Moves this job's folder from /jobs/toPrint to /jobs/inProgress.
        /// </summary>
        /// <param name="Q">A PrintRequest that must be i nthe print queue.</param>
        /// <returns>JobStatus indicating success or failure.</returns>
        public JobStatus printJob(PrintRequest Q)
        {
            return JobStatus.Success;
        }

        /// <summary>
        /// Once a job finishes printing (in real life) it can be 
        /// extracted from the printing queue. When doing this, move
        /// the job's folder into /jobs/archive to keep things clean.
        /// </summary>
        /// <param name="Q"></param>
        /// <returns></returns>
        public JobStatus collectJob(PrintRequest Q)
        {
            return JobStatus.Success;
        }

        public Queue<PrintRequest> getPrintQueue() { return printQueue; }
        public Queue<PrintRequest> getCurrPrintingQueue() { return printingQueue; }
    }

    internal enum JobStatus
    {
        Success, 
    }
}
