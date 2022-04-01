using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace makerspace_3dp_admin
{
    /// <summary>
    /// The main orchestation point for this project.
    /// </summary>
    internal class Admin
    {
        private Queue<PrintRequest> printQueue = new Queue<PrintRequest>();
        private Queue<PrintRequest> printingQueue = new Queue<PrintRequest>();

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
