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

            // Retrieve working directory location
            string? pqDir = ConfigurationManager.AppSettings.Get("workingDir");
            
            // Prompt user to set directory if it doesn't exist
            if (pqDir == "")
            {
                System.Windows.Forms.FolderBrowserDialog ofd = new System.Windows.Forms.FolderBrowserDialog();
                ofd.ShowDialog();
                ConfigurationManager.AppSettings.Set("workingDir", ofd.SelectedPath);
            }

            // Try to read in print queue
            try
            {
                string[] printQueueItems = Directory.GetDirectories($"{pqDir}\\PrintQueue");
                foreach (string pqi in printQueueItems)
                {
                    // Try read properties from XML file - if it doesn't exist
                    // perform fuzzy search on a human-readable text file if it exists.
                    // This handles the case of a user electing to not use the program.

                    // Todo: xml interpretation

                    // Open info file
                    string[] files = Directory.GetFiles(pqi, "*.txt");
                    PrintRequest r;

                    // If there are multiple text files for whatever reason, only look
                    // at the first one. If there are none, give up (for now)
                    if (files != null)
                    {
                        StreamReader r = new StreamReader(files[0]);


                        // These text files are unfortunately very loosely structured,
                        // with the exception of a author on the first line and staff on
                        // last line.
                        string? author = r.ReadLine();
                        string? project;
                        string? copies;
                        string? tech;
                        string? material;
                        string? staff;
                        string? line;
                        while ((line = r.ReadLine()) != null)
                        {
                            if (line.StartsWith("Project:"))
                            {
                                project = line.Split(":")[1].Trim();
                            }
                            else if (line.StartsWith("Copies:"))
                            {
                                copies = line.Split(":")[1].Trim();
                            }
                            else if (line.StartsWith("Tech:"))
                            {
                                tech = line.Split(":")[1].Trim();
                            }
                            else if (line.StartsWith("Material:"))
                            {
                                material = line.Split(":")[1].Trim();
                            }

                            // Relatively hacky way to capture staff name
                            staff = line.Trim();
                        }
                        r = PrintRequest.fuzzyNew(author, project, copies, tech, material, staff);


                    }
                    // TODO: Handle case where no txt file is provided

                    //PrintRequest r = new PrintRequest();
                }
            }
            catch (System.IO.DirectoryNotFoundException)
            {
                // If queue folder doesn't exist, ask user if they want to create it.
                MessageBoxButton buttons = MessageBoxButton.YesNo;
                MessageBoxResult r = MessageBox.Show("PrintQueue subdirectory doesn't exist. Would you like to create it?", "Error", buttons);
                if (r == MessageBoxResult.Yes)
                {
                    Directory.CreateDirectory($"{pqDir}\\PrintQueue");
                }
            }

            // 

        }

        /// <summary>
        /// Create a new job folder and add it to the print queue.
        /// Additionally stores this job as a folder inside of /jobs/toPrint.
        /// </summary>
        /// <param name="Q">A freshly generated PrintRequest -> should be returned
        /// by UI.</param>
        /// <returns>JobStatus indicating success or failure.</returns>
        public static JobStatus createNewJob(PrintRequest Q)
        {
            // If this is somehow called before program initialises, fail
            if (_instance == null)
                return JobStatus.Fail_Uninitialised;

            // Retrieve working directory
            string? pqDir = ConfigurationManager.AppSettings.Get("workingDir");
            if (pqDir == null)
            {
                return JobStatus.Fail_BadDir;
            }

            // Check for a duplicate job
            foreach (PrintRequest r in _instance.printQueue)
            {
                if (r.getDir() == Q.getDir())
                {
                    // Duplicate found. 
                    // TODO: add logic to prompt user to handle this case. Bail out gracelessly for now.
                    return JobStatus.Fail_Duplicate;
                }
            }

            // Append to queue
            _instance.printQueue.Append(Q);

            // Add to folder
            //try
            //{
                Directory.CreateDirectory($"{pqDir}\\{Q.getDir()}");
            //}
            

            
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
            // If this is somehow called before program initialises, fail
            if (_instance == null)
                return JobStatus.Fail_Uninitialised;

            // If this job isn't in the queue, it either is invalid or already printing
            if (!_instance.printQueue.Contains(Q))
                return JobStatus.Fail_NotInQueue;

            
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
            // If this is somehow called before program initialises, fail
            if (_instance == null)
                return JobStatus.Fail_Uninitialised;

            // If this job isn't in the queue, it either is invalid or already printing
            if (!_instance.printingQueue.Contains(Q))
                return JobStatus.Fail_NotInQueue;

            return JobStatus.Success;
        }

        public Queue<PrintRequest> getPrintQueue() { return printQueue; }
        public Queue<PrintRequest> getCurrPrintingQueue() { return printingQueue; }
    }

    internal enum JobStatus
    {
        Success, Fail_Uninitialised, Fail_NotInQueue, Fail_BadDir, Fail_Duplicate
    }
}
